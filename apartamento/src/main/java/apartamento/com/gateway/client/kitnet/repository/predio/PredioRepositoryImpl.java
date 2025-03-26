package apartamento.com.gateway.client.kitnet.repository.predio;

import apartamento.com.common.http.dto.predio.PredioFilter;
import apartamento.com.core.entity.Predio;
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

public class PredioRepositoryImpl implements PredioRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public Page<Predio> filter(PredioFilter predioFilter, Pageable pageable) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Predio> criteria = builder.createQuery(Predio.class);
		Root<Predio> root = criteria.from(Predio.class);

		criteria.orderBy(builder.asc(root.get("id")));

		Predicate[] predicates = criarRestricoes(predioFilter, builder, root);
		criteria.where(predicates);

		TypedQuery<Predio> query = manager.createQuery(criteria);
		adicionarRestricoesDePaginacao(query, pageable);

		List<Predio> predios = query.getResultList();

		return new PageImpl<>(predios, pageable, total(predioFilter));
	}


	private Predicate[] criarRestricoes(PredioFilter diarioFilter, CriteriaBuilder builder,
			Root<Predio> root) {
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
	
	private Long total(PredioFilter predioFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Predio> root = criteria.from(Predio.class);

		Predicate[] predicates = criarRestricoes(predioFilter, builder, root);
		criteria.where(predicates);

		criteria.select(builder.count(root));
		return manager.createQuery(criteria).getSingleResult();
	}

}
