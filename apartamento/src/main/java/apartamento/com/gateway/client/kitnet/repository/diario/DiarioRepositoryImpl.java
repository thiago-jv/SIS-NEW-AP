package apartamento.com.gateway.client.kitnet.repository.diario;

import apartamento.com.common.http.dto.diario.DiarioFilter;
import apartamento.com.core.entity.Diario;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class DiarioRepositoryImpl implements DiarioRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public Page<Diario> filter(DiarioFilter diarioFilter, Pageable pageable) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Diario> criteria = builder.createQuery(Diario.class);
		Root<Diario> root = criteria.from(Diario.class);

		criteria.orderBy(builder.asc(root.get("id")));

		Predicate[] predicates = criarRestricoes(diarioFilter, builder, root);
		criteria.where(predicates);

		TypedQuery<Diario> query = manager.createQuery(criteria);
		adicionarRestricoesDePaginacao(query, pageable);

		List<Diario> diarios = query.getResultList();

		return new PageImpl<>(diarios, pageable, total(diarioFilter));
	}


	private Predicate[] criarRestricoes(DiarioFilter diarioFilter, CriteriaBuilder builder,
			Root<Diario> root) {
		List<Predicate> predicates = new ArrayList<>();

        if (!Objects.isNull(diarioFilter.id())) {
			
        	predicates.add(builder.equal((root.get("id")), diarioFilter.id()));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}
	
	private void adicionarRestricoesDePaginacao(TypedQuery<?> query, Pageable pageable) {
		int paginaAtual = pageable.getPageNumber();
		int totalRegistrosPorPagina = pageable.getPageSize();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;

		query.setFirstResult(primeiroRegistroDaPagina);
		query.setMaxResults(totalRegistrosPorPagina);
	}
	
	private Long total(DiarioFilter diarioFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Diario> root = criteria.from(Diario.class);

		Predicate[] predicates = criarRestricoes(diarioFilter, builder, root);
		criteria.where(predicates);

		criteria.select(builder.count(root));
		return manager.createQuery(criteria).getSingleResult();
	}

}
